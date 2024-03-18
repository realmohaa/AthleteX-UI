import { useState } from "react";
import {
  TextInput as DefaultTextInput,
  Platform,
  TextInputProps,
} from "react-native";
import tailwind from "twrnc";

/**
 * React Native text input component built with Tailwind CSS
 */
export const TextInput = ({
  placeholderTextColor,
  ...props
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleEndEditing = () => {
    setIsFocused(false);
  };

  return (
    <DefaultTextInput
      {...props}
      onFocus={handleFocus}
      onEndEditing={handleEndEditing}
      style={[
        tailwind`w-full bg-neutral-100 border border-black/20 rounded-md h-9 px-4 text-neutral-950`,
        isFocused && Platform.OS !== "web" ? tailwind`border-blue-500` : {},
        props.style,
      ]}
      placeholderTextColor={
        placeholderTextColor || tailwind.color("text-neutral-400")
      }
    />
  );
};
