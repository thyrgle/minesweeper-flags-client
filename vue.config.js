let branch = process.env.VUE_APP_GIT_BRANCH;
if (branch === "master") {
  branch = "";
}

module.exports = {
  chainWebpack: config => {
    config.externals({
      kotlin: "kotlin",
      klogging: "klogging"
    });
  },
  publicPath: "/" + branch
};
