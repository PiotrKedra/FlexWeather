
function getLightTheme(){
    return {
        id: 'light',
        mainColor: '#eee',
        softColor: '#ccc',
        mainText: '#111',
        softText: '#777',
        backgroundColor: '#eee',
        softBackgroundColor: '#bbb',
    }
}

function getDarkTheme(){
    return {
        id: 'dark',
        mainColor: '#222',
        softColor: '#444',
        mainText: '#ccc',
        softText: '#777',
        backgroundColor: '#333',
        softBackgroundColor: '#555',
    }
}

export {getLightTheme, getDarkTheme};
