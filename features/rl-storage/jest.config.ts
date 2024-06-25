/* eslint-disable */
export default {
    displayName: 'rlStorage',
    preset: '../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/features/rl-storage',
    setupFiles: ['./setupTest.ts'],
};
