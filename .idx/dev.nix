{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
  ];
  idx.extensions = [
    
  
 "bradlc.vscode-tailwindcss"
 "dsznajder.es7-react-js-snippets"];
  env = {
    NEXT_PUBLIC_API_URL="https://api.int.geev.it";
    NEXT_PUBLIC_DOMAIN_URL=".cloudworkstations.dev";
  };
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}