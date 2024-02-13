pmset -g batt |
head -2 |
tail -1 |
awk '{
  gsub("%|;", "", $3);
  gsub(";", "", $4);
  print "{\"battery\":{\"level\":" $3 ",\"state\":\"" $4 "\"},"
}' |
tr -d "\n";
top |
head -4 |
tail -1 |
awk '{
  gsub("%", "", $3);
  gsub("%", "", $5);
  gsub("%", "", $7);
  print "\"cpu\":{\"user\":" $3 ",\"sys\":" $5 ",\"idle\":" $7 "},"
}' |
tr -d "\n";
df -Ht ~/ |
tail -1 |
awk '{
  gsub("T|G|M", "", $2);
  gsub("T|G|M", "", $4);
  print "\"disk\":{\"total\":" $2 ",\"available\":" $4 "}}"
}' |
tr -d "\n"
