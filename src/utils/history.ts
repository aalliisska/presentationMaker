import { Store } from 'redux'
import { Editor } from '../store/type'

type HistoryType = {
    undo: () => Editor | undefined,
    redo: () => Editor | undefined,
}

function getLastItem(stack: Array<Editor>): Editor {
    return stack[stack.length - 1]
} 

function initHistory(store: Store<Editor>): HistoryType {
    const undoStack: Array<Editor> = []
    let redoStack: Array<Editor> = []

    let previousEditor = store.getState()

    store.subscribe(() => {
        const editor = store.getState()
        if (!undoStack.length || previousEditor.presentation != editor.presentation) {
            if (editor == getLastItem(undoStack)) {
                undoStack.pop()
                redoStack.push(previousEditor)
            } else if (editor == getLastItem(redoStack)) {
                redoStack.pop()
                undoStack.push(previousEditor)
            } else {
                undoStack.push(previousEditor)
                redoStack = []
            }
        }
        previousEditor = editor
    })

    function undo() {
        return getLastItem(undoStack)
    }

    function redo() {
        return getLastItem(redoStack)
    }

    return {
        undo,
        redo,
    }
}

export {
    type HistoryType,
    initHistory
}

/*import { Store } from 'redux';
import { Editor } from '../store/type';

type HistoryType = {
    undo: () => Editor | undefined,
    redo: () => Editor | undefined,
};

function getLastItem(stack: Array<Editor>): Editor | undefined {
    return stack.length > 0 ? stack[stack.length - 1] : undefined;
}

function initHistory(store: Store<Editor>): HistoryType {
    const undoStack: Array<Editor> = [];
    const redoStack: Array<Editor> = [];

    let previousEditor = store.getState();

    store.subscribe(() => {
        const editor = store.getState();

        // Сравниваем состояния
        if (previousEditor !== editor) {
            undoStack.push(previousEditor); // Добавляем предыдущее состояние в undoStack
            previousEditor = editor; // Обновляем текущее состояние
            redoStack.length = 0; // Очищаем redoStack при новом изменении
        }
    });

    function undo() {
        if (undoStack.length === 0) return undefined;

        const lastState = getLastItem(undoStack);
        undoStack.pop(); // Удаляем последнее состояние из undoStack
        if (lastState) {
            redoStack.push(previousEditor); // Сохраняем текущее состояние в redoStack
            previousEditor = lastState; // Обновляем текущее состояние
            store.dispatch({ type: 'SET_EDITOR', payload: lastState }); // Обновляем состояние редактора
        }
        return previousEditor;
    }

    function redo() {
        if (redoStack.length === 0) return undefined;

        const nextState = getLastItem(redoStack);
        redoStack.pop(); // Удаляем следующее состояние из redoStack
        if (nextState) {
            undoStack.push(previousEditor); // Сохраняем текущее состояние в undoStack
            previousEditor = nextState; // Обновляем текущее состояние
            store.dispatch({ type: 'SET_EDITOR', payload: nextState }); // Обновляем состояние редактора
        }
        return previousEditor;
    }

    return {
        undo,
        redo,
    };
}

export {
    type HistoryType,
    initHistory
};*/
