pmset -g batt |
grep -Eo "\d+%" |
cut -d% -f1 |
tr -d "\n" |
sed 's/^/{"hearts": /' |
awk '{print $1 $2 ","}'  |
tr -d "\n" ;
top |
head -4 |
tail -1 |
grep -Eo "\d+\.+\d+%" |
tail -1 |
cut -d% -f1 |
tr -d "\n" |
sed 's/^/"magic": /'  |
awk '{print $1 $2 "}"}'