#!/bin/sh

COMPONENT_LAYER=$1
COMPONENT_NAME=$2

COMPONENT_FOLDER=./storybook/components/$COMPONENT_LAYER/$COMPONENT_NAME
COMPONENT_STORY_FOLDER=./storybook/stories/$COMPONENT_NAME
COMPONENT_STORYBOOK_LOCATION="$(tr '[:lower:]' '[:upper:]' <<< ${COMPONENT_LAYER:0:1})${COMPONENT_LAYER:1}"

echo "[... started creating $COMPONENT_LAYER named $COMPONENT_NAME]"

mkdir -p $COMPONENT_FOLDER
mkdir -p $COMPONENT_STORY_FOLDER

cp ./storybook/scripts/templates/component.txt $COMPONENT_FOLDER/index.tsx
cp ./storybook/scripts/templates/component.stories.txt $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx

sed s/Component/$COMPONENT_NAME/g $COMPONENT_FOLDER/index.tsx > $COMPONENT_FOLDER/index.tsx.out
sed s/ComponentLayer/$COMPONENT_LAYER/g $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx > $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx.out
sed s/StoryLocation/$COMPONENT_STORYBOOK_LOCATION/g $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx.out > $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx.out.2
sed s/Component/$COMPONENT_NAME/g $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx.out.2 > $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx

mv $COMPONENT_FOLDER/index.tsx.out $COMPONENT_FOLDER/index.tsx
rm $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx.out
rm $COMPONENT_STORY_FOLDER/$COMPONENT_NAME.stories.tsx.out.2

echo "import './$COMPONENT_NAME/$COMPONENT_NAME.stories';" >> ./storybook/stories/index.ts

echo "[... finished creating $COMPONENT_LAYER named $COMPONENT_NAME]"
