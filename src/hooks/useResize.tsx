import { useEffect, useRef } from "react";
import { useAppActions } from '../hooks/useAppActions'

type ResizeDirection = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';

function useResize(id: string, targetRef: React.RefObject<HTMLDivElement>, direction: ResizeDirection) {
  const { changeObjectSize } = useAppActions()
  const isResizing = useRef<boolean>(false);
  const startSize = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseDown = (event: MouseEvent) => {
    isResizing.current = true;
    startSize.current = {
      width: targetRef.current!.offsetWidth,
      height: targetRef.current!.offsetHeight,
    };
    startPosition.current = { x: event.clientX, y: event.clientY };
    event.preventDefault();
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;

    const dx = event.clientX - startPosition.current.x;
    const dy = event.clientY - startPosition.current.y;

    let newWidth = startSize.current.width;
    let newHeight = startSize.current.height;

    switch (direction) {
      case 'top-left':
        newWidth = Math.max(0, startSize.current.width - dx);
        newHeight = Math.max(0, startSize.current.height - dy);
        //targetRef.current!.style.left = `${targetRef.current!.offsetLeft + dx}px`;
        //targetRef.current!.style.top = `${targetRef.current!.offsetTop + dy}px`;
        break;
      case 'top':
        newHeight = Math.max(0, startSize.current.height - dy);
        //targetRef.current!.style.top = `${targetRef.current!.offsetTop + dy}px`;
        break;
      case 'top-right':
        newWidth = Math.max(0, startSize.current.width + dx);
        newHeight = Math.max(0, startSize.current.height - dy);
        //targetRef.current!.style.top = `${targetRef.current!.offsetTop + dy}px`;
        break;
      case 'left':
        newWidth = Math.max(0, startSize.current.width - dx);
        //targetRef.current!.style.left = `${targetRef.current!.offsetLeft + dx}px`;
        break;
      case 'right':
        newWidth = Math.max(0, startSize.current.width + dx);
        break;
      case 'bottom-left':
        newWidth = Math.max(0, startSize.current.width - dx);
        newHeight = Math.max(0, startSize.current.height + dy);
        //targetRef.current!.style.left = `${targetRef.current!.offsetLeft + dx}px`;
        break;
      case 'bottom':
        newHeight = Math.max(0, startSize.current.height + dy);
        break;
      case 'bottom-right':
        newWidth = Math.max(0, startSize.current.width + dx);
        newHeight = Math.max(0, startSize.current.height + dy);
        break;
    }
    if (targetRef.current) {
      targetRef.current.style.width = `${newWidth}px`;
      targetRef.current.style.height = `${newHeight}px`;
    }

    // Вызываем действие для изменения размера
    changeObjectSize({ id: id, size: { width: newWidth, height: newHeight } });
  };

  
  const onMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    const targetElement = targetRef.current;

    if (targetElement) {
      targetElement.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener("mousedown", onMouseDown);
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [targetRef]);

  return null; // Можно вернуть дополнительное состояние, если нужно
}

export { useResize }

/*import { useEffect, useRef } from "react"

function useResize(targetRef: React.RefObject<HTMLDivElement>) {
  const isResizing = useRef<boolean>(false)
  const startSize = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const startPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const onMouseDown = (event: MouseEvent) => {
    isResizing.current = true
    startSize.current = {
      width: targetRef.current!.offsetWidth,
      height: targetRef.current!.offsetHeight,
    }
    startPosition.current = { x: event.clientX, y: event.clientY }
    event.preventDefault()
  }

  const onMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return

    const dx = event.clientX - startPosition.current.x
    const dy = event.clientY - startPosition.current.y

    if (targetRef.current) {
      targetRef.current.style.width = `${startSize.current.width + dx}px`
      targetRef.current.style.height = `${startSize.current.height + dy}px`
    }
  }

  const onMouseUp = () => {
    isResizing.current = false
  }

  useEffect(() => {
    const targetElement = targetRef.current

    if (targetElement) {
      targetElement.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener("mousedown", onMouseDown)
      }
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [targetRef])

  return null
}

export { useResize }*/
