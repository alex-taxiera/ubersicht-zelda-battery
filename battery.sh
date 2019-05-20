pmset -g batt |
grep -Eo "\d+%" |
cut -d% -f1 |
tr -d "\n" ; top -u -l 1 | head -4
