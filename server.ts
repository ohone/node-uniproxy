import http from "http";

const host = "localhost";
const port = 8000;
const proxyUni: http.RequestListener = function (req, client_res) {
  var options = {
    hostname: "https://api.uniswap.org",
    port: 80,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  var proxy = http.request(options, function (res) {
    client_res.writeHead(res.statusCode, res.headers);
    res.pipe(client_res, {
      end: true,
    });
  });

  req.pipe(proxy, {
    end: true,
  });
};

const server = http.createServer(proxyUni);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
