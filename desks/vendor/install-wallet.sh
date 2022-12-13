# Usage:
# ./install-wallet.sh <ship_name> <desk>
# ./install-wallet.sh zod playground

mkdir -p "../ships/$1/wallet" && cp -R -f wallet/* ../ships/$1/wallet && echo "~$1" > ../ships/$1/wallet/desk.ship