# Personal growth, identity formation, and well-being

I examined how personal growth initiative relates to identity formation, self-esteem, and depressive symptoms. I reconstructed a covariance matrix from published correlations and standard deviations for 551 Belgian adolescents and young adults aged 14–35. I fitted path models in lavaan using Wishart maximum likelihood. After exploratory revisions, the final specification had CFI = 0.994 and RMSEA = 0.034, compared with 0.275 and 0.291 for the initial model.

## Results

| Specification | χ² | df | CFI | RMSEA |
| --- | ---: | ---: | ---: | ---: |
| Initial | 1904.86 | 40 | 0.275 | 0.291 |
| Final | 37.34 | 23 | 0.994 | 0.034 |

I recomputed these fit statistics on 8 October 2026. [model_fit.csv](results/model_fit.csv) contains all nineteen specifications; I retained model 18 as the final model. In that model, ruminative exploration was associated with lower self-esteem (standardized coefficient = −0.376) and more depressive symptoms (0.361). I report all estimates in [final_parameters.csv](results/final_parameters.csv).

<details>
<summary>Code and files</summary>

I ran the analysis in R with `lavaan`, `corrplot`, and `tidyverse` installed.

```bash
Rscript analysis.R
```

The summary data are embedded in the script. No participant-level data are required.

```text
Personal-Growth-Identity-Formation-and-Well-Being-SEM-Path-Model/
├── .gitignore
├── README.md
├── analysis.R
└── results/
    ├── final_parameters.csv
    ├── model_fit.csv
    ├── model_output.txt
    └── session_info.txt
```

</details>

## Limitations

I used modification indices to revise the model on the same data, so the final fit may reflect sample-specific choices. Summary data prevent checks of individual response patterns and missingness. The cross-sectional associations do not establish causal mediation.

## Credits

This was completed by **Laura Maria Fetz**. I used the summary statistics reported by [Luyckx and Robitschek (2014)](https://doi.org/10.1016/j.adolescence.2014.07.009).
