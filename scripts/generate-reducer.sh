#!/bin/sh
# Generates a reducer using our standard example for use in the app

REDUCER_NAME=$1
CAPITALISE_REDUCER_NAME="$(tr '[:lower:]' '[:upper:]' <<< ${REDUCER_NAME:0:1})${REDUCER_NAME:1}"

echo "[... started creating reducer $REDUCER_NAME]"
cd health-study

cp -R redux/reducer-template redux/$REDUCER_NAME
cd redux/$REDUCER_NAME

sed s/example/$REDUCER_NAME/g __tests__/index.ts > __tests__/index.ts.out
sed s/Example/$CAPITALISE_REDUCER_NAME/g __tests__/index.ts.out > __tests__/index.ts
rm __tests__/index.ts.out

sed s/example/$REDUCER_NAME/g index.ts > index.ts.out
sed s/Example/$CAPITALISE_REDUCER_NAME/g index.ts.out > index.ts
rm index.ts.out

sed s/example/$REDUCER_NAME/g selectors.ts > selectors.ts.out
sed s/Example/$CAPITALISE_REDUCER_NAME/g selectors.ts.out > selectors.ts
rm selectors.ts.out

sed s/example/$REDUCER_NAME/g thunks.ts > thunks.ts.out
sed s/Example/$CAPITALISE_REDUCER_NAME/g thunks.ts.out > thunks.ts
rm thunks.ts.out

sed s/exampleThunk/$REDUCER_NAME/g types.ts > types.ts.out
mv types.ts.out types.ts

echo "[... finished creating reducer $REDUCER_NAMEs]"
echo "[... remember to import reducer $REDUCER_NAME in store.ts]"
