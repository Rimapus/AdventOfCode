{ pkgs, ... }:

{
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_26;
    npm.enable = true;
    npm.install.enable = true;
  };

  packages = [ pkgs.eslint ];
}
