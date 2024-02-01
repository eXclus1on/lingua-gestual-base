// useInputManager.js
import { useCallback, useEffect, useState } from 'react';

const useInputManager = ({ changeWebcam, changeMic, localWebcamOn }) => {
  const [selectedDevices, selectDevices] = useState({
    audiooutput: undefined,
    audioinput: undefined,
    videoinput: undefined,
  });
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
    (mediaDevices) => {
      const devices = [];

      mediaDevices.forEach((device) => {
        if (
          devices.filter(
            (e) => e.groupId === device.groupId && e.kind === device.kind,
          ).length
        ) {
          return;
        }
        devices.push(device);
      });

      setDevices(devices);

      const defaultMic =
        devices.filter(
          (e) => e.kind === 'audioinput' && e.deviceId === 'default',
        )[0] ??
        devices.filter((e) => e.kind === 'audioinput')[0] ??
        undefined;
      const defaultAudio =
        devices.filter(
          (e) => e.kind === 'audiooutput' && e.deviceId === 'default',
        )[0] ??
        devices.filter((e) => e.kind === 'audiooutput')[0] ??
        undefined;
      const defaultWebcam =
        devices.filter(
          (e) => e.kind === 'videoinput' && e.deviceId === 'default',
        )[0] ??
        devices.filter((e) => e.kind === 'videoinput')[0] ??
        undefined;

      selectDevices({
        audiooutput: defaultAudio,
        audioinput: defaultMic,
        videoinput: defaultWebcam,
      });
    },
    []
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    changeMic?.(selectedDevices.audioinput?.deviceId);
    localWebcamOn && changeWebcam?.(selectedDevices.videoinput?.deviceId);
  }, [changeMic, changeWebcam, selectedDevices]);

  return { selectedDevices, selectDevices, devices, setDevices };
};

export { useInputManager };
