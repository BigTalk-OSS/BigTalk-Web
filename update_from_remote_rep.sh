if  [$1 != ""]
	then
		git remote -v
		git remote add upstream $1
		git remote -v
	else
		git fetch upstream
		git checkout master
		git merge upstream/master
		git push
fi;;
