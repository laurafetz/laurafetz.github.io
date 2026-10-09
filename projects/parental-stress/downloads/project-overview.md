# Stress intervention and employment status

I examined whether the association between a mindfulness intervention and parental stress differed by employment status. I used coursework data from 320 parents: 168 participants and 152 nonparticipants. I fitted an ANCOVA with baseline stress, intervention participation, employment status, and their interaction. The interaction improved fit, F(2, 313) = 34.98, p < .001. It added 1.40 percentage points of explained variance.

## Results

I estimated higher post-intervention stress among participants in each employment group, after adjusting for baseline stress.

| Employment status | Adjusted difference: participation minus nonparticipation | 95% CI |
| --- | ---: | ---: |
| Full-time | 18.74 | [16.71, 20.77] |
| Part-time | 13.56 | [10.85, 16.27] |
| Unemployed | 8.82 | [6.82, 10.83] |

I used a Bonferroni adjustment across the three contrasts. R² was 0.9236 for the additive model and 0.9376 for the interaction model. The table comes from [intervention_contrasts.csv](results/intervention_contrasts.csv), recomputed on 8 October 2026.

![Adjusted stress by participation and employment status](results/interaction.png)

<details>
<summary>Code and files</summary>

I ran the analysis in R with `emmeans` and `ggplot2` installed.

```bash
Rscript analysis.R
```

The supplied data contain `employmentStatus`, `intervention`, `stress1`, and `stress2`. Standardized contrasts use the sample SD of post-intervention stress.

```text
Stress-Intervention-ANOVA/
├── .gitignore
├── README.md
├── analysis.R
├── data/
│   └── stress_intervention.txt
└── results/
    ├── interaction.png
    ├── intervention_contrasts.csv
    ├── model_comparison.csv
    ├── model_output.txt
    ├── session_info.txt
    └── standardized_contrasts.csv
```

</details>

## Limitations

The quasi-experimental design does not identify a causal intervention effect. Baseline adjustment does not remove confounding from unmeasured differences between participants and nonparticipants. I cannot generalize beyond this coursework sample without information about recruitment.

## Credits

This was completed by **Laura Maria Fetz**. The data were supplied for the course.
