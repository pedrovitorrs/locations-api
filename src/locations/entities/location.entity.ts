import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from "typeorm";

@Entity("location")
export class LocationEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    state: string;
  
    @CreateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)",
    })
    createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: "timestamp" })
    deletedAt: Date;
}
