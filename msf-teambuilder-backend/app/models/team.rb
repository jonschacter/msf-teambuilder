class Team < ApplicationRecord
    has_many :characters, dependent: :delete_all
    validates :name, presence: true

    def name=(s)
        write_attribute(:name, s.to_s.titleize)
    end
end
