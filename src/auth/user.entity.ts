import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Token } from './token/token.entity';
import { Workspace } from 'src/workspace/workspace.entity';
import { Role } from './roles/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  // @JoinTable()
  @JoinTable({
    name: 'user_role', // Specify the name of the join table if it's different from the default naming convention
    joinColumn: {
      name: 'user_id', // Name of the column in the join table that references the User entity
      referencedColumnName: 'id', // Name of the referenced column in the User entity
    },
    inverseJoinColumn: {
      name: 'role_id', // Name of the column in the join table that references the Role entity
      referencedColumnName: 'id', // Name of the referenced column in the Role entity
    },
  })
  roles: Role[];

  @OneToOne(() => Token)
  @JoinColumn({ name: 'tokenId' })
  token: Token;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Workspace, (workspace) => workspace.createdBy)
  createdWorkspaces: Workspace[];

  @ManyToMany(() => Workspace, (workspace) => workspace.members)
  workspaces: Workspace[];
}
