export const catchCancelledFlow = (e: unknown) => {
    if (!(e instanceof Error && e.message === 'FLOW_CANCELLED')) throw e;
};
