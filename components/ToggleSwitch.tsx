import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import { Svg, Path, Mask } from 'react-native-svg';

interface ToggleSwitchProps {
  onToggle?: (isEnabled: boolean) => void;
  initialValue?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle, initialValue = false }) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);
  const animatedValue = React.useRef(new Animated.Value(initialValue ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isEnabled, animatedValue]);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    
    if (onToggle) {
      onToggle(newValue);
    }
  };

  // Animação para o botão deslizar
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 25],
  });

  // Animação para fade do primeiro SVG
  const opacityFirstSVG = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // Animação para fade do segundo SVG (quando ativado)
  const opacitySecondSVG = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity 
      onPress={toggleSwitch}
      activeOpacity={0.8}
      className="flex-row items-center space-x-3 mr-4"
    >
      <Text className="text-lg font-medium text-white mr-2">
        Status: {isEnabled ? 'ON' : 'OFF'}
      </Text>
      
      <Animated.View className="relative w-14 h-8">
        {/* SVG da parte externa (fundo) - SEMPRE VISÍVEL */}
        <Svg width={56} height={30} viewBox="0 0 59 29" className="absolute top-0 left-0">
          <Mask id="a" fill="#fff">
            <Path d="m44.23 0 14.744 14.743L44.23 29.486H14.742L0 14.743 14.743 0H44.23Z" />
          </Mask>
          <Path
            fill="#010101"
            d="m44.23 0 14.744 14.743L44.23 29.486H14.742L0 14.743 14.743 0H44.23Z"
          />
          <Path
            fill={isEnabled ? "#10b981" : "#DBB33A"}
            d="m44.23 0 .87-.869-.36-.36h-.51V0Zm14.744 14.743.868.869.87-.869-.87-.869-.868.87ZM44.23 29.486v1.229h.508l.36-.36-.868-.869Zm-29.488 0-.869.87.36.359h.51v-1.229ZM0 14.743l-.869-.869-.869.87.87.868.868-.869ZM14.743 0v-1.229h-.509l-.36.36.87.869ZM44.23 0l-.868.869 14.743 14.743.869-.869.868-.869L45.1-.869 44.231 0Zm14.744 14.743-.87-.869-14.742 14.744.868.868.87.87 14.742-14.744-.868-.869ZM44.23 29.486v-1.228H14.742v2.457H44.23v-1.229Zm-29.488 0 .869-.868L.869 13.874l-.869.87-.869.868 14.743 14.743.87-.869ZM0 14.743l.869.869L15.612.869 14.743 0l-.869-.869L-.869 13.874l.869.87ZM14.743 0v1.229H44.23V-1.23H14.744V0Z"
            mask="url(#a)"
          />
        </Svg>

        {/* Primeiro SVG do botão (cor amarela quando desligado) */}
        <Animated.View 
          style={{ 
            transform: [{ translateX }],
            opacity: opacityFirstSVG 
          }}
          className="absolute top-1 left-1"
        >
          <Svg width={24} height={24} viewBox="0 0 25 25">
            <Path fill="#FBF7EB" d="m12.286 0 12.286 12.286-12.286 12.286L0 12.286 12.286 0Z" />
            <Path fill="#DBB33A" d="m12.286 0 12.286 12.286-12.286 12.286L0 12.286 12.286 0Z" />
          </Svg>
        </Animated.View>

        {/* Segundo SVG do botão (cor verde quando ligado) */}
        <Animated.View 
          style={{ 
            transform: [{ translateX }],
            opacity: opacitySecondSVG 
          }}
          className="absolute top-1 left-1"
        >
          <Svg width={24} height={24} viewBox="0 0 25 25">
            <Path fill="#FBF7EB" d="m12.286 0 12.286 12.286-12.286 12.286L0 12.286 12.286 0Z" />
            <Path fill="#10b981" d="m12.286 0 12.286 12.286-12.286 12.286L0 12.286 12.286 0Z" />
          </Svg>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ToggleSwitch;