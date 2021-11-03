# Git series 

::: tip
There are a lot of posts out there about learning the basic commands of git, this is not one of them. What I’m going to try here is a different approach.  
原理啊原理和原理和原理
:::
## 参考
- [daolf-git-series](https://www.daolf.com/tags/git/)
- [git-with-d3](http://onlywei.github.io/explain-git-with-d3/#commit%E3%80%82)
- [lzane-git](https://www.lzane.com/tech/git-internal/)
- [git怎么判断冲突](https://segmentfault.com/a/1190000003966242)

## 炫技
- graph list`git log --graph --abbrev-commit --decorate --all --oneline`
- 抹除commit黑历史`git reset --soft ur_commit` 保留修改的同时，ur_commit之后的历史抹掉
- 回滚 `git reset --hard [_commit_]`