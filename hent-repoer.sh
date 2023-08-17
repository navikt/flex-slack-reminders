rm -f repos.txt
gh search repos archived:false --topic=team-flex --owner=navikt --limit=200 --json "name" --jq ".[] | .name" >> repos.txt
