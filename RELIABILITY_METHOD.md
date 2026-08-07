# Reliability Method and Formulae (Fabrica)

## 1. Method Used

The system uses a **deterministic rule-based scoring method** (heuristic scoring), not a machine-learning probability model.

Reliability is computed by combining domain rules from:
- fabric image features,
- style/image compatibility,
- body measurements,
- style complexity,
- and material feasibility.

Each rule adds or subtracts points. Final scores are clamped to fixed bounds.

## 2. Core Mathematical Functions

### 2.1 Clamp

All major reliability outputs use bounded clipping:

$$
\operatorname{clamp}(x, a, b) = \min\left(\max(x,a), b\right)
$$

## 3. Fabric-Type Inference Reliability

After scoring candidate fabrics, let:
- $S_1$ = highest candidate score,
- $S_2$ = second-highest candidate score.

Fabric inference reliability is:

$$
R_{fabric} = \operatorname{clamp}\left(62 + 2(S_1 - S_2),\ 62,\ 94\right)
$$

Interpretation: larger margin between top two candidates means more reliable classification.

## 4. Style-Reference Reliability

For style-profile inference from the uploaded style image, with top-two style scores $T_1, T_2$:

$$
R_{style} = \operatorname{clamp}\left(60 + 2(T_1 - T_2),\ 60,\ 92\right)
$$

## 5. Quote/Recommendation Reliability in Summary

For a selected style estimate, the summary reliability is:

$$
R_{summary} = \operatorname{clamp}\left(
72
+ 9\,I_{fabricImage}
+ 5\,I_{structured\land highComplexity}
+ 3\,I_{pattern\neq plain}
- 4\,I_{chiffon\land highComplexity},
72,
96
\right)
$$

Where indicator terms are 1 when true, else 0.

Definitions used in code:
- $I_{fabricImage}=1$ if a fabric image is uploaded.
- $I_{structured\land highComplexity}=1$ if texture is Structured and style complexity $>1.5$.
- $I_{pattern\neq plain}=1$ if pattern is not Plain.
- $I_{chiffon\land highComplexity}=1$ if fabric is Chiffon and style complexity $>1.5$.

## 6. Final Generated-Style Match Score

For each candidate style $k$, the generated match score is:

$$
M_k = \operatorname{clamp}\left(
B_k + A_k + F_k + U_k + C_k - P_k + Q_k,
52,
99
\right)
$$

With terms:
- $B_k$: base score from summary reliability.
- $A_k$: template-alignment contribution.
- $F_k$: fabric-signal compatibility contribution.
- $U_k$: body-fit contribution.
- $C_k$: style-reference contribution.
- $P_k$: penalties (e.g., complexity mismatch and risk penalties).
- $Q_k$: feasibility adjustment (+8 if cuttable with available yardage, -14 otherwise).

## 7. Reliability Interpretation Note

Because this is rule-based:
- values represent **confidence under encoded tailoring rules**,
- not probabilistic uncertainty from statistical learning.

A practical interpretation for the paper:
- higher reliability = stronger agreement among handcrafted domain rules,
- lower reliability = weaker rule agreement or higher operational risk.
