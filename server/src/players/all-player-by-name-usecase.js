export default class AllPlayerByNameUseCase {
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute(name) {
    return await this.playerRepository.findAllByName(name);
  }
}
