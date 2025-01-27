import { useEffect, useRef } from "react"
import { useAppActions } from '../hooks/useAppActions'

function useDragAndDrop(id: string, index?: number, totalSlides?: number) {
  const { changeSlideIndex } = useAppActions()
  const { changeObjectPosition } = useAppActions()
  const isClicked = useRef<boolean>(false)
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (targetRef.current === null) throw new Error("Element with given id doesn't exist")

    const container = targetRef.current.parentElement
    if (container === null) throw new Error("Target element must have a parent")
    const containerBounds = container.getBoundingClientRect()

    let resultPosition: {x: number, y: number} | null = null
    let dragOffset: { left: number; top: number } | null = null;
    let newIndex: number | null = null

    const onMouseDown = (event: MouseEvent) => {
      isClicked.current = true
      const objectPosition = targetRef.current!.getBoundingClientRect()
      dragOffset = {
        left: event.clientX - objectPosition.left,
        top: event.clientY - objectPosition.top,
      }
    }

    const onMouseUp = () => {
      isClicked.current = false;
      if (targetRef.current && newIndex !== null && newIndex !== index) {
        console.log(`Changing index of slide ${id} from ${index} to ${newIndex}`)
        changeSlideIndex({ id, index: newIndex })
        newIndex = null
      }
      if (targetRef.current && resultPosition) {
        changeObjectPosition({
          id: id,
          position: resultPosition
        })
        
        resultPosition = null
        dragOffset = null

    }
  }

    const onMouseMove = (event: MouseEvent) => {
      if (!isClicked.current || !targetRef.current || !dragOffset) return

      const resultPositionY = event.clientY - container.getBoundingClientRect().top - dragOffset.top

      if (resultPositionY < 0 || resultPositionY > container.clientHeight) {
        return
      }

      targetRef.current.style.transform = `translateY(${resultPositionY}px)`

      const slides = Array.from(container.children)

      newIndex = slides.findIndex((slide) => {
        const rect = slide.getBoundingClientRect()
        return (
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        )
      })

      if (totalSlides !== undefined) {
        newIndex = Math.max(0, Math.min(newIndex, totalSlides - 1));
      }

      console.log(`New index calculated: ${newIndex}`)

      resultPosition = {
        x: event.clientX - containerBounds.left - dragOffset.left,
        y:event.clientY - containerBounds.top - dragOffset.top,
      }

      if (targetRef.current) {
        targetRef.current.style.left = `${resultPosition.x}px`
        targetRef.current.style.top = `${resultPosition.y}px`
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        isClicked.current = false
        document.removeEventListener("mousemove", onMouseMove)
      }
    }

    targetRef.current.addEventListener("mousedown", onMouseDown)
    targetRef.current.removeEventListener("mouseup", onMouseUp)
    container.addEventListener("mousemove", onMouseMove)
    window.addEventListener("keydown", onKeyDown)

    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener("mousedown", onMouseDown)
        targetRef.current.removeEventListener("mouseup", onMouseDown)
      }
      container.removeEventListener("mousemove", onMouseMove)
    };
  }, [id, index, totalSlides])

  return targetRef
}

export { useDragAndDrop }


/*import { useEffect, useRef } from "react"
import { useAppActions } from '../hooks/useAppActions'

function useDragAndDrop(id: string) {
  const { changeObjectPosition } = useAppActions()
  const isClicked = useRef<boolean>(false)
  const targetRef = useRef<HTMLDivElement | null>(null)
  

  useEffect(() => {
    if (targetRef.current === null) throw new Error("Element with given id doesn't exist")

    const container = targetRef.current.parentElement
    if (container === null) throw new Error("Target element must have a parent")
    const containerBounds = container.getBoundingClientRect()

    let resultPosition: {x: number, y: number} | null = null
    let dragOffset: {left: number, top: number} | null = null

    const onMouseDown = (event: MouseEvent) => {
      isClicked.current = true

      const objectPosition = targetRef.current!.getBoundingClientRect()
      // Рассчитываем сдвиг мышки относительно верхнего левого угла картинки
      // Это понадобится нам для корректного рассчета в дальнейшем
      dragOffset = {
        left: event.clientX - objectPosition.left,
        top: event.clientY - objectPosition.top,
      }
    };

    const onMouseUp = () => {
      isClicked.current = false
      if (targetRef.current && resultPosition) {
        changeObjectPosition({
          id: id,
          position: resultPosition
        })
        
        resultPosition = null
        dragOffset = null
      }
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!isClicked.current || !targetRef.current || !dragOffset) return

      // Рассчитываем новую позицию
      // Не забываем о нашем сдвиге рассчитанном в начале
      resultPosition = {
        x: event.clientX - containerBounds.left - dragOffset.left,
        y:event.clientY - containerBounds.top - dragOffset.top,
      }

      if (targetRef.current) {
        targetRef.current.style.left = `${resultPosition.x}px`
        targetRef.current.style.top = `${resultPosition.y}px`
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        isClicked.current = false
        document.removeEventListener("mousemove", onMouseMove)
      }
    }

    
    targetRef.current.addEventListener("mousedown", onMouseDown)
    targetRef.current.addEventListener("mouseup", onMouseUp)
    container.addEventListener("mousemove", onMouseMove)
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener("mousedown", onMouseDown)
        targetRef.current.removeEventListener("mouseup", onMouseUp)
      }
      container.removeEventListener("mousemove", onMouseMove)
    };
  }, [id])

  return targetRef
}

export { 
  useDragAndDrop
}*/

/*import { useEffect, useRef } from "react";
import { useAppActions } from '../hooks/useAppActions';

type Coords = { startX: number; startY: number; lastX: number; lastY: number };

function useDragAndDrop(id: string) {
  const { changeObjectPosition } = useAppActions();
  const isClicked = useRef<boolean>(false);
  const coords = useRef<Coords>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
  const targetRef = useRef<HTMLDivElement | null>(null); // Create a ref for the target element

  useEffect(() => {
    targetRef.current = document.getElementById(id) as HTMLDivElement; // Assign the element to the ref
    if (targetRef.current === null) throw new Error("Element with given id doesn't exist");

    const container = targetRef.current.parentElement;
    if (container === null) throw new Error("Target element must have a parent");

    const onMouseDown = (event: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = event.clientX;
      coords.current.startY = event.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      if (targetRef.current) {
        changeObjectPosition({
          id: id,
          position: { x: targetRef.current.offsetLeft, y: targetRef.current.offsetTop }
        });
        coords.current.lastX = targetRef.current.offsetLeft;
        coords.current.lastY = targetRef.current.offsetTop;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = event.clientX - coords.current.startX + coords.current.lastX;
      const nextY = event.clientY - coords.current.startY + coords.current.lastY;

      if (targetRef.current) {
        targetRef.current.style.left = `${nextX}px`;
        targetRef.current.style.top = `${nextY}px`;
      }
    };

    targetRef.current.addEventListener("mousedown", onMouseDown);
    targetRef.current.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener("mousedown", onMouseDown);
        targetRef.current.removeEventListener("mouseup", onMouseUp);
      }
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, [id]);

  return targetRef; // Return the ref if needed
}

export default useDragAndDrop;*/


/*import { useEffect } from 'react';
import { Position } from '../store/type';

const useDragAndDrop = (ref: React.RefObject<HTMLDivElement>, setPos: React.Dispatch<React.SetStateAction<Position>>) => {
    let startPos: Position = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
        startPos = { x: e.pageX, y: e.pageY };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
        const delta: Position = {
            x: e.pageX - startPos.x,
            y: e.pageY - startPos.y,
        };
        setPos((prevPos) => ({
            x: prevPos.x + delta.x,
            y: prevPos.y + delta.y,
        }));
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    useEffect(() => {
        const element = ref.current;
        if (element) {
            element.addEventListener('mousedown', onMouseDown);
        }
        return () => {
            if (element) {
                element.removeEventListener('mousedown', onMouseDown);
            }
        };
    }, [ref]);
};

export { useDragAndDrop } */

/*import { useEffect, useState } from 'react';

const useDragAndDrop = (ref: React.RefObject<HTMLDivElement>,) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [modelPos, setModelPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseDown = (e: { pageX: any; pageY: any; }) => {
            setStartPos({ x: e.pageX, y: e.pageY });
            setIsDragging(true);
        };

        const onMouseMove = (e: { pageX: number; pageY: number; }) => {
            if (!isDragging) return;
            const deltaX = e.pageX - startPos.x;
            const deltaY = e.pageY - startPos.y;
            setModelPos((prev) => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY,
            }));
            setStartPos({ x: e.pageX, y: e.pageY }); // Обновляем начальную позицию
        };

        const onMouseUp = () => {
            setIsDragging(false);
        };

        ref.current.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            ref.current.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [isDragging, startPos, ref]);

    return modelPos;
};

export default useDragAndDrop;
*/

/* import { useEffect, useState, useRef } from "react";
import { Position } from "../store/type";

function useDragAndDrop(
  ref: React.RefObject<HTMLDivElement>,
  parentRef: React.RefObject<HTMLDivElement>,
  dispatchFn: (delta: Position) => void,
): Position {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 }); // Начальное значение
  const startPos = useRef<Position | null>(null);
  const modelStartPos = useRef<Position | null>(null);

  const handleMouseDown = (e: MouseEvent): void => {
    startPos.current = { x: e.pageX, y: e.pageY };
    modelStartPos.current = ref.current
      ? {
          x: position.x,
          y: position.y,
        }
      : { x: 0, y: 0 };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!startPos.current || !modelStartPos.current || !parentRef.current) return;

    const delta = {
      x: e.pageX - startPos.current.x,
      y: e.pageY - startPos.current.y,
    };

    const newPosition = {
      x: modelStartPos.current.x + delta.x,
      y: modelStartPos.current.y + delta.y,
    };

    setPosition(newPosition);
    dispatchFn(newPosition); // Вызываем функцию обновления позиции
    e.preventDefault();
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
    }
    
    return () => {
      if (element) {
        element.removeEventListener('mousedown', handleMouseDown);
      }
      // Clean up any mousemove and mouseup events in case the component unmounts
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref]);

  return position; // Возвращаем позицию без возможности null
}

export { useDragAndDrop };

*/