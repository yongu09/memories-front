import { create } from "zustand";

// interface: 집중력 검사 결과 상태 구조 //
interface ConcecntrationTestStore {
  measurementScore: number;
  errorCount: number;

  increaseMeasurementScore: () => void;
  increaseErrorCount: () => void;
}

// function: 집중력 검사 스토어 생성 함수 //
const useStore = create<ConcecntrationTestStore>(set => ({
  measurementScore: -1,
  errorCount: -1,
  
  increaseMeasurementScore: () => set(state => ({ ...state, measurementScore: state.measurementScore + 1 })),
  increaseErrorCount: () => set(state => ({ ...state, errorCount: state.errorCount + 1 })),
}));

export default useStore;