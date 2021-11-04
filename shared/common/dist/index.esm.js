function transformBooleanProperties(value) {
    if (value === '') {
        return 'true';
    }
    else if (value === null) {
        return 'false';
    }
    return value;
}

export { transformBooleanProperties };
//# sourceMappingURL=index.esm.js.map
