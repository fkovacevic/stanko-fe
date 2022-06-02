import { useEffect, useState } from 'react';

const DeviceWidth = {
	MOBILE_WIDTH: 600,
	TABLET_WIDTH: 1000,
	PC_WIDTH: 9999,
}

type DeviceTypes = keyof typeof DeviceWidth;

const useDeviceWidth = () => {
    let initialWidth: DeviceTypes;
    if (window.innerWidth < DeviceWidth.MOBILE_WIDTH ) {
        initialWidth = 'MOBILE_WIDTH'
    } else if (window.innerWidth > DeviceWidth.MOBILE_WIDTH && window.innerWidth <= DeviceWidth.TABLET_WIDTH) {
        initialWidth = 'TABLET_WIDTH';
    } else {
        initialWidth = 'PC_WIDTH';
    }
    const [deviceWidth, setDeviceWidth] = useState<DeviceTypes>(initialWidth);

    function resizeHandler() {
        if (window.innerWidth < DeviceWidth.MOBILE_WIDTH ) {
            setDeviceWidth('MOBILE_WIDTH');
		} else if (window.innerWidth > DeviceWidth.MOBILE_WIDTH && window.innerWidth <= DeviceWidth.TABLET_WIDTH) {
            setDeviceWidth('TABLET_WIDTH');
		} else {
            setDeviceWidth('PC_WIDTH');
		}
	}
	useEffect(() => {
		window.addEventListener('resize', resizeHandler);
	}, []);

	return deviceWidth;
}

export default useDeviceWidth;
