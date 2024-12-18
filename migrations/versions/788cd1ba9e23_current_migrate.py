"""current migrate

Revision ID: 788cd1ba9e23
Revises: 
Create Date: 2024-12-18 11:23:27.019389

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '788cd1ba9e23'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('listings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('sqft', sa.Integer(), nullable=True),
    sa.Column('bedroom_amt', sa.Integer(), nullable=True),
    sa.Column('bathroom_amt', sa.Integer(), nullable=True),
    sa.Column('kitchen', sa.Boolean(), nullable=True),
    sa.Column('amenities', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time', sa.DateTime(), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('listing_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['listing_id'], ['listings.id'], name=op.f('fk_bookings_listing_id_listings')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_bookings_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bookings')
    op.drop_table('users')
    op.drop_table('listings')
    # ### end Alembic commands ###
