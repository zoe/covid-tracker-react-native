import { Button } from "native-base";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, fontStyles } from "../../theme";

interface Props {
    children: React.ReactNode;
    style?: object;
}

export const HeaderText = ({ style, children }: Props) => (
    <Text style={[styles.headerText, style]}>{children}</Text>
);

export const HeaderLightText = ({ style, children }: Props) => (
    <Text style={[styles.headerLightText, style]}>{children}</Text>
);

export const RegularText = ({ style, children }: Props) => (
    <Text style={[styles.regularText, style]}>{children}</Text>
);

export const ClippedText = ({ style, children }: Props) => (
    <Text style={[styles.regularText, style]} numberOfLines={1}>
        {children}
    </Text>
);

export const SecondaryText = ({ style, children }: Props) => (
    <Text style={[styles.secondaryText, style]}>{children}</Text>
);

export const MutedText = ({ style, children }: Props) => (
    <Text style={[styles.regularMutedText, style]}>{children}</Text>
);

export const CaptionText = ({ style, children }: Props) => (
    <Text style={[styles.captionText, style]}>{children}</Text>
);

export const ErrorText = ({ style, children }: Props) => (
    <Text style={[styles.errorText, style]}>{children}</Text>
);

export const RegularBoldText = ({ style, children }: Props) => (
    <Text style={[styles.regularBoldText, style]}>{children}</Text>
);

interface ClickableProps {
    children: React.ReactNode;
    style?: any;
    onPress: () => void;
    enable?: boolean;
    hideLoading?: boolean;
    testID?: string
}

interface ButtonProps {
    buttonProps?: any;
}

interface TextProps {
    textProps?: any;
}

export const BrandedButton = ({
    style,
    children,
    onPress,
    enable,
    buttonProps,
    textProps,
    hideLoading,
}: ClickableProps & ButtonProps & TextProps) => {
    const btnStyle = [styles.button, style];
    const isDisabled = enable === false;
    if (isDisabled) {
        btnStyle.push(styles.buttonDisabled);
    }

    return (
        <Button
            block
            style={btnStyle}
            onPress={() => {
                !isDisabled && onPress();
            }}
            {...buttonProps}
        >
            <Text
                style={[fontStyles.bodyLight, styles.buttonText]}
                {...textProps}
            >
                {children}
            </Text>
            {isDisabled && !hideLoading && <ActivityIndicator size="small" />}
        </Button>
    );
};

export const ClickableText = ({style, children, onPress, testID}: ClickableProps) => (
  <Text style={[styles.clickableText, style]} onPress={onPress}>{children}</Text>
);

export const Divider = () => (
  <View style={styles.divider}/>
);

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
    headerText: {
        ...fontStyles.h2Reg,
    },

    headerLightText: {
        ...fontStyles.h1Light,
    },

    regularText: {
        ...fontStyles.bodyReg,
    },

    secondaryText: {
        ...fontStyles.bodySecondary,
    },

    regularMutedText: {
        ...fontStyles.bodyMutedReg,
    },

    captionText: {
        ...fontStyles.bodySmallLight,
    },

    errorText: {
        ...fontStyles.bodyReg,
        color: colors.feedbackBad,
    },

    regularBoldText: {
        ...fontStyles.bodyReg,
        fontWeight: "600",
    },

    clickableText: {
        ...fontStyles.bodyReg,
        color: colors.purple,
    },

    button: {
        borderRadius: 100,
        height: 56,
        backgroundColor: colors.brand,
        elevation: 0,
    },

    buttonDisabled: {
        backgroundColor: colors.backgroundBrandDisabled,
    },

    buttonText: {
        color: colors.white,
    },

    divider: {
        borderBottomWidth: 2,
        borderColor: colors.backgroundFour,
        paddingVertical: 20,
        marginLeft: 15,
    },
});
