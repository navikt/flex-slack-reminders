rm repos.txt
gh search repos archived:false --topic=team-flex --owner=navikt --visibility=public --limit=200 --json "name" --jq ".[] | .name" >> repos.txt
