import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../config/colors';

function Typography({
    title,
    weight,
    style,
    children,
    color,
    size,
    align,
    ml,
    mr,
    mb,
    mt,
    numberoflines,
    ...rest
}) {

    return (
        <Text
            style={[
                {
                    fontFamily: "Montserrat",
                    fontSize: size,
                    lineHeight: size + 5,
                    color: colors[color],
                    textAlign: align,
                    textAlignVertical: 'center',
                    marginTop: mt,
                    marginBottom: mb,
                    marginRight: mr,
                    marginLeft: ml,
                    fontWeight: weight
                },
                style,
            ]}
            {...rest}
            numberOfLines={numberoflines}
        >
            {children}
        </Text>
    );
}

Typography.propTypes = {
    weight: PropTypes.oneOf([
        '500',
        '600',
        '700',
        '800',
        "normal"
    ]),
    color: PropTypes.oneOf([
        'white',
        'black',
        'lightBlack',
        'gray',
        'whiteGray',
    ]),
    title: PropTypes.bool,
    align: PropTypes.oneOf(['center', 'left', 'right', 'justify']),
    ml: PropTypes.number,
    mr: PropTypes.number,
    mb: PropTypes.number,
    mt: PropTypes.number,
    numberoflines: PropTypes.number,
};

Typography.defaultProps = {
    weight: '500',
    size: 14,
    color: 'white',
    align: 'center',
    style: {},
    numberoflines: 0,
};

export default Typography;