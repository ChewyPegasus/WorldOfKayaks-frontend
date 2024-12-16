export const formatDuration = (minutes) => {
    if (!minutes && minutes !== 0) return 'N/A';
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
        return `${remainingMinutes} min`;
    } else if (remainingMinutes === 0) {
        return `${hours} h`;
    } else {
        return `${hours} h ${remainingMinutes} min`;
    }
};

export const formatPoints = (points) => {
    if (!points || points.length === 0) return 'No points';
    
    // Сортируем точки: сначала START, потом остальные в порядке добавления, в конце END
    const sortedPoints = [...points].sort((a, b) => {
        if (a.type === 'START') return -1;
        if (b.type === 'START') return 1;
        if (a.type === 'END') return 1;
        if (b.type === 'END') return -1;
        return 0;
    });
    
    // Форматируем каждую точку
    const pointDescriptions = sortedPoints.map(point => {
        switch (point.type) {
            case 'START':
                return 'Start';
            case 'END':
                return 'Finish';
            case 'REST':
                return 'Rest stop';
            case 'FOOD':
                return 'Food stop';
            case 'SIGHT':
                return 'Sightseeing';
            default:
                return point.type;
        }
    });
    
    return pointDescriptions.join(' → ');
};
