import Tag from '@tracer/components/atoms/Tag';
import React from 'react';

const CovidTag = () => <Tag style={{ position: 'absolute', right: 10, top: 10 }} text="COVID" />;

export default React.memo(CovidTag);
