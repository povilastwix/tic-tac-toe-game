import React, { useEffect } from 'react';
import { st, classes } from './app.st.css';
import { Button } from 'wix-style-react';
import { CREATE_GAME_BOARD, CREATE_GAME_BUTTON } from './constants';
import { setGameState, setIsCreateGameModalVisible } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { GameBoard } from './components/game-board';
import { AppState, SquareState, GAME_STATE } from './redux/types';
import { CreateGameModal } from './components/create-game-modal';
import { checkIfPlayerWon } from './utils/game-logic';

export interface AppProps {
    className?: string;
}

export const App: React.FC<AppProps> = ({ className }) => {
    const turnOrder = useSelector((state: AppState) => state.board.turnOrder);
    const winningScenarios = useSelector((state: AppState) => state.winningScenarios);
    const boardCreated = useSelector((state: AppState) => state.board.created);
    const squares = useSelector((state: AppState) => state.board.squares);
    const dispatch = useDispatch();
    useEffect(() => {
        const checkingPlayer = turnOrder === 'player1' ? 'player2' : 'player1';
        let playerSelectedSquares = squares
            .filter((el: SquareState) => el.selectedBy === checkingPlayer)
            .map((el: SquareState) => {
                return el.id;
            });
        if (boardCreated) {
            if (checkIfPlayerWon(playerSelectedSquares, winningScenarios)) {
                if (checkingPlayer === 'player1') dispatch(setGameState(GAME_STATE.PLAYER1_WON));
                else dispatch(setGameState(GAME_STATE.PLAYER2_WON));
            }
        }
    }, [turnOrder]);
    return (
        <main className={st(classes.root, className)}>
            <Button
                onClick={() => dispatch(setIsCreateGameModalVisible(true))}
                className={'create-game-button'}
                dataHook={CREATE_GAME_BUTTON}
            >
                {CREATE_GAME_BOARD}
            </Button>
            <CreateGameModal />
            <GameBoard />
        </main>
    );
};
