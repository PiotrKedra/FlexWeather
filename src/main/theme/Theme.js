
function getLightTheme(){
    return {
        id: 'light',
        mainColor: '#ddd',
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
        mainText: '#bbb',
        softText: '#777',
        backgroundColor: '#333',
        softBackgroundColor: '#555',
    }
}

export {getLightTheme, getDarkTheme};
