import { Repository } from 'typeorm';

import { CustomRepository } from 'src/typeorm-ex/typeorm-ex.decorator';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/auth/user.entity';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createdBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createdBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }
}
