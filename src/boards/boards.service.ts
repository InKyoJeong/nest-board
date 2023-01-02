import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  async getBoardById(id: number): Promise<Board> {
    const foundBoard = await this.boardRepository.findOneBy({ id });

    if (!foundBoard) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return foundBoard;
  }
  // getBoardById(id: string): Board {
  //   const foundBoard = this.boards.find((board) => board.id === id);
  //   if (!foundBoard) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return foundBoard;
  // }
  // deleteBoard(id: string): void {
  //   const foundBoard = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
