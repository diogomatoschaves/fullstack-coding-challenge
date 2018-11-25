"""empty message

Revision ID: 070a482d8d5d
Revises: 3fae9a6cc30c
Create Date: 2018-11-25 13:58:55.979687

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '070a482d8d5d'
down_revision = '3fae9a6cc30c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('translation_jobs', sa.Column('status', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('translation_jobs', 'status')
    # ### end Alembic commands ###
