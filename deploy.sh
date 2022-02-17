ENV=${1:-dev}
echo "Removing stack..."
DEPLOYMENT_NAMESPACE=url-scraper
docker stack rm $DEPLOYMENT_NAMESPACE
limit=15

echo "Waiting for stack to be removed..."
until [ -z "$(docker service ls --filter label=com.docker.stack.namespace=$DEPLOYMENT_NAMESPACE -q)" ] || [ "$limit" -lt 0 ]; do
  sleep 2
  limit="$((limit-1))"
done
limit=15;
until [ -z "$(docker network ls --filter label=com.docker.stack.namespace=$DEPLOYMENT_NAMESPACE -q)" ] || [ "$limit" -lt 0 ]; do
  sleep 2;
  limit="$((limit-1))";
done

if [ "$1" = "dev" ]
then
  echo "Building development image ..."
  docker build . -f dev.Dockerfile -t url-scraper:local
else
  echo "Building production image ..."  
  docker build . -f Dockerfile -t url-scraper:local
fi

echo "Deploying stack"
docker stack deploy $DEPLOYMENT_NAMESPACE --compose-file docker-compose.yml --resolve-image always

docker service logs url-scraper -f