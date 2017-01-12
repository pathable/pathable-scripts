#!/bin/sh -e

# Usage: ./script/prune
# Removes local and remote branches that have already been merged to master.

# Prune branches from origin.
git remote prune origin

# Delete local merged branches.
git branch --merged=master |
grep -v -e master -e releases |
xargs git branch -d

# Delete remote merged branches.
git branch -r --merged=master |
grep -v -e master -e releases |
grep origin/ |
sed 's-origin/-:-' |
xargs git push origin
