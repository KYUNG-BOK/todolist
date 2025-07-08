import React, { useState, useEffect } from 'react';
import styles from './ReasonModal.module.css'; 

const TodoEditModal = ({ initialText, onConfirm, onCancel }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleConfirm = () => {
    if (text.trim()) {
      onConfirm(text.trim());
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>✍️ 할 일 수정하기</h2>

        <textarea
          className={styles.textarea}
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="수정사항을 입력해주세여~"
        />

        <div className={styles.buttonGroup}>
          <button onClick={onCancel} className={styles.cancelButton}>
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={!text.trim()}
            className={styles.confirmButton}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoEditModal;
