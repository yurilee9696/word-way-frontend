import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIc } from '../../../assets/icons/cross.svg';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Label from '../../label';
import Button from '../../button';
import IconButton from '../../iconButton';
import Checkbox from '../../checkbox';
import useFiltering from '../../../hooks/useFiltering';
import useModal from '../../../hooks/useModal';
import ReactDOM from 'react-dom';
import InputButton from '../../autosizeButton';

const Modal = (): React.ReactElement => {
    const { FilteringState, onToggleSearchAgain, onSelSpeech, onToggleExcludeKeyword } = useFiltering();
    const { ModalState, onToggleModal } = useModal();
    const theme = useContext(ThemeContext);
    const speechs = ['명사', '동사', '형용사', '관형사', '대명사', '감탄사', '부사']; // 변경 예정

    let flag = false;
    const StyleDiv = styled.div`
        border-radius:20px;
        background: white;
        border-radius: 8px 8px 0px 0px;
        box-shadow: 0px 0px 16px 0px rgba(84, 84, 84, .1);
        position: relative;
        min-height: 135px;
        padding: 18px;
        position: absolute;
        bottom: 0;
        .content {
            margin-bottom: 20px;
            .btn {
                margin: 4px;
                &:first-of-type {
                    margin-left: 0px;
                }
                &:last-of-type {
                    margin-right: 0px;
                }
            }
            /* .input_btn{
                margin: 4px 0px 4px 8px;
            } */
        }
        .filter {
            align-items: center;
            display: flex;
        }
    `;

    const Backdrop = styled.div`
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,0.3);
    `;
    const ModalWrapp = styled.div`
        width: 100%;
    `;
    const ModalCbx = styled(Checkbox)`
        margin-right:6px;
    `;

    const inputComplete = (e?: any) => {
        // e.persist();
        // autoInput reset
        // 제외할 키워드 추가

        e.target.value = '';
        if (flag) { onToggleExcludeKeyword(false); }
    };
    const keyDown = (e: any) => {
        if (e.keyCode === 13) { // enter입력
            inputComplete(e);
        }
    };
    const aaa = (e: any) => {
        console.log('--flag');
        flag = true;
    };
    const Wrap = styled.div`
        /* display:flex; */
    `;

    const CusAAA = styled(InputButton)`
  margin: 4px 0px 4px 8px;
    .input_btn{
    margin: 0;
    }
    `;
    return ModalState.show ? ReactDOM.createPortal(
        <ModalWrapp>
            <Backdrop></Backdrop>
            <StyleDiv>
                <IconButton onClick={onToggleModal} icon={<CloseIc />} variant='text' className='content'></IconButton>
                <div className='content'>
                    <Label color={theme.colors.g500}
                        weight='bold'
                        size='large'>필터링
                </Label>
                    <div className='filter'>
                        {/* <CheckIc icon={<CloseIc />} variant='text' size='small'></CheckIc> */}
                        <ModalCbx
                            onChange={(e) => onToggleSearchAgain(e)}
                            defaultChecked={FilteringState.searchAgainFlag}></ModalCbx>
                        <div>
                            <Label color={theme.colors.g500}
                                weight='bold'>결과 내 재검색
                        </Label>
                            <Label color={theme.colors.g500}
                                size='small'>결과 내에서 재검색을 통해 키워드끼리 교집합 결과를 보여줍니다.
                        </Label>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <Label
                        color={theme.colors.g500}
                        weight='bold'>품사 선택
                    </Label>
                    {speechs.map((speechaaa, index: number) =>
                        <Button
                            className='btn'
                            onClick={() => onSelSpeech(index)}
                            color={index % 2 === 0 ? theme.colors.blue : theme.colors.g100}
                            corner='rounded'
                            variant='contained'
                            key={index}>{speechaaa}
                        </Button>
                    )}
                </div>
                <div className='content'>
                    <Label color={theme.colors.g500}
                        weight='bold'>제외할 키워드
                    </Label>
                    <Wrap>
                        <Button
                            className='btn'
                            color={theme.colors.blue}
                            corner='rounded'
                            variant='contained'
                        >테스트</Button>
                        <Button
                            className='btn'
                            color={theme.colors.blue}
                            corner='rounded'
                            variant='contained'
                        >테스트</Button>
                        {FilteringState.ExcludeKeywordFlag ? <CusAAA
                            // className='input_btn'
                            minWidth={40}
                            placeholder='변경'
                            onBlur={(e: any) => inputComplete(e)}
                            onChange={aaa}
                            onKeyDown={keyDown}
                            // color={theme.colors.g500}
                            onCancle={() => onToggleExcludeKeyword(false)}
                        ></CusAAA> :
                            <IconButton
                                onClick={() => onToggleExcludeKeyword(true)}
                                className='btn'
                                icon={<CloseIc />}
                                color={theme.colors.blue}
                                variant='outlined'
                                corner='rounded'
                                btnInnerIc={true}></IconButton>
                        }
                    </Wrap>
                </div>
            </StyleDiv>
        </ModalWrapp>
        , document.body) : <div></div>;
};

export default React.memo(Modal);
