import { useEffect } from "react";
// @ts-ignore
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
        void WebBrowser.coolDownAsync();
        };
    }, []);
};