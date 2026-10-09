# Consideration of future consequences: factor structure and invariance 

I examined whether the twelve-item Consideration of Future Consequences scale was better described by one factor or two. I used an Open-Source Psychometrics course subset of 5,525 respondents aged 13–19, collected in 2011–2012. I fitted confirmatory factor models with FIML and tested measurement invariance across gender groups. In my original report, the two-factor model had CFI = 0.951 and RMSEA = 0.058, compared with 0.912 and 0.077 for one factor.

## Results

| Model | CFI | RMSEA | AIC |
| --- | ---: | ---: | ---: |
| One factor | 0.912 | 0.077 | 196,367 |
| Two correlated factors | 0.951 | 0.058 | 195,576 |

I transcribed the original fit statistics into [original_model_fit.csv](results/original_model_fit.csv). The two factors represent prospective and immediate consequences. I also reported scalar invariance across gender groups. I have not rerun these models because the exact course data are not included.

<details>
<summary>Code and files</summary>

The R script requires `lavaan`, `tidyverse`, `countrycode`, `psych`, and `semPlot`.

```bash
Rscript analysis.R /path/to/CFCS.tsv
```

I read a tab-delimited file with `Q1`–`Q12`, `age`, `gender`, `country`, and `accuracy`. The original missing-value code is `0`. The public [data catalogue](https://openpsychometrics.org/_rawdata/) identifies the source, but the matching course subset and preprocessing are needed to reproduce the original estimates.

```text
Consideration-of-Future-Consequences-SEM-Factor-Model/
├── .gitignore
├── README.md
├── analysis.R
└── results/
    └── original_model_fit.csv
```

</details>

## Limitations

The smallest gender subgroup contained 77 respondents, which limits precision for its estimates and comparisons. FIML relies on a missing-at-random assumption that I did not verify. The observational sample does not support causal explanations of gender differences.

## Credits

This was completed by **Laura Maria Fetz**. The questionnaire data came from the Open-Source Psychometrics Project.
