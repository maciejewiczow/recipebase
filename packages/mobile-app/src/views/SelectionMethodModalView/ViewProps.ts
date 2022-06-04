export interface SelecMethodModalViewRouteProps {
    selectWhat: 'file' | 'directory';
}

export interface FileSelectionButtonProps {
    onFileSelected?: (filePath: string) => any;
}
