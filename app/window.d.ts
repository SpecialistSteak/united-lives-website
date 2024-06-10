export {};

declare global {
  interface Window {
    triggerSearch: () => void;
    find: (searchTerm: string, caseSensitive?: boolean, backwards?: boolean, wrapAround?: boolean, wholeWord?: boolean, searchInFrames?: boolean, showDialog?: boolean) => boolean;
  }
}
