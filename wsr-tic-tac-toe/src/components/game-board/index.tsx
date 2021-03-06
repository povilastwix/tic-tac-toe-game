import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Square } from '../square';
import { GAME_STATE, AppState } from '../../redux/types';
import { st, classes } from '../../app.st.css';
import { Button } from 'wix-style-react';
import { clearBoard } from '../../redux/actions';
import { Heading } from 'wix-style-react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-typed-hooks/use-window-size';
import {
    RESET_GAME,
    PLAYER1_WON,
    PLAYER2_WON,
    TURN_ORDER_HEADING,
    RESET_GAME_BUTTON,
} from '../../constants';
const GameBoard: React.FunctionComponent<{}> = () => {
    const boardState = useSelector((state: AppState) => state.board);
    const dispatch = useDispatch();
    const size = useWindowSize();
    const matrix = [...Array(boardState.boardSize).keys()].map((row) => {
        return [...Array(boardState.boardSize).keys()].map(
            (cell) => cell + row * boardState.boardSize
        );
    });
    function handleResetGame() {
        dispatch(clearBoard());
    }
    return (
        <>
            {boardState.gameState === GAME_STATE.PLAYER1_WON ||
            boardState.gameState === GAME_STATE.PLAYER2_WON ? (
                <Confetti width={size?.width} height={size?.height} />
            ) : null}
            {boardState.boardSize > 0 ? (
                <Heading id="turn-order" dataHook={TURN_ORDER_HEADING}>
                    {boardState.gameState === GAME_STATE.PLAYER1_WON
                        ? PLAYER1_WON
                        : boardState.gameState === GAME_STATE.PLAYER2_WON
                        ? PLAYER2_WON
                        : `${
                              boardState.turnOrder.charAt(0).toUpperCase() +
                              boardState.turnOrder.slice(1)
                          }'s turn`}
                </Heading>
            ) : null}
            <div id="game-board" className={st(classes.gameBoard)}>
                {boardState.boardSize > 0
                    ? matrix.map((row, i) => {
                          return (
                              <div className={st(classes.row)} id={`row-${i}`} key={`row-${i}`}>
                                  {row.map((el: number) => {
                                      return <Square id={el} key={el} />;
                                  })}
                              </div>
                          );
                      })
                    : null}
                {boardState.created ? (
                    <Button dataHook={RESET_GAME_BUTTON} onClick={() => handleResetGame()}>
                        {RESET_GAME}
                    </Button>
                ) : null}
            </div>
        </>
    );
};
export { GameBoard };
