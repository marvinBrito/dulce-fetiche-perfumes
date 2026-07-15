import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/**
 * PARCHE ANTI-TRADUCTOR
 * ----------------------------------------------------------------
 * Google Translate (y otras extensiones similares) modifican el DOM
 * por fuera del control de React, insertando sus propios nodos de
 * texto traducido. Cuando React luego intenta actualizar o eliminar
 * esos nodos (por ejemplo al abrir/cerrar un modal), el nodo original
 * ya no está donde React lo dejó, y lanza:
 *
 *   Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node'
 *
 * Este parche sobreescribe removeChild e insertBefore para que, si el
 * nodo que React intenta manipular ya no es hijo directo del padre
 * esperado (porque el traductor lo movió), simplemente lo ignore en
 * vez de lanzar el error y romper toda la app.
 * ----------------------------------------------------------------
 */
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Parche anti-traductor] Se evitó un removeChild inválido (probablemente causado por Google Translate).'
        );
      }
      return child;
    }
    return originalRemoveChild.apply(this, [child]) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Parche anti-traductor] Se evitó un insertBefore inválido (probablemente causado por Google Translate).'
        );
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, [newNode, referenceNode]) as T;
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);